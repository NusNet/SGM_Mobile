import {useEffect, useReducer, useRef, useState} from 'react'

interface State<T> {
    data?: T
    isLoading:boolean,
    error?: Error,
    refetch: (url?: string) => Promise<void>
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
    | { type: 'loading' }
    | { type: 'fetched'; payload: T }
    | { type: 'error'; payload: Error }

export function useAPIFetch<T = unknown>(
    initUrl: string,
    options?: RequestInit,
): State<T> {
    const [url, setUrl] = useState<string>(initUrl);
    const [forceUpdate, setForceUpdate] = useState<number>(0);

    const refetchData = async (newUrl?: string) => {
        if (url !== newUrl && newUrl) setUrl(newUrl);
        else setForceUpdate(prevState => prevState + 1);
    }

    const cache = useRef<Cache<T>>({})

    // Used to prevent state update if the component is unmounted
    const cancelRequest = useRef<boolean>(false)

    const initialState: State<T> = {
        error: undefined,
        isLoading: false,
        data: undefined,
        refetch: refetchData,
    }

    // Keep state logic separated
    const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
            case 'loading':
                return { ...initialState, isLoading:true }
            case 'fetched':
                return { ...initialState, data: action.payload }
            case 'error':
                return { ...initialState, error: action.payload }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState)

    useEffect(() => {
        // Do nothing if the url is not given
        if (!url) return

        cancelRequest.current = false

        const fetchData = async () => {
            console.log("Fetching data", url)

            dispatch({ type: 'loading' })

            // If a cache exists for this url, return it
            if (false && cache.current[url]) {
                dispatch({ type: 'fetched', payload: cache.current[url] })
                return
            }

            try {
                const response = await fetch(url, {headers:{'Accept': 'application/json',
                'Content-Type': 'application/json'},...options} )
                if (!response.ok) {
                    console.log("Not Ok Response",response)
                    throw new Error(response.statusText || response.status.toString())
                }

                const data = (await response.json()) as T

                cache.current[url] = data
                if (cancelRequest.current) return

                dispatch({ type: 'fetched', payload: data })
            } catch (error) {
                if (cancelRequest.current) return
                console.log("ERROR Response",error)

                dispatch({ type: 'error', payload: error as Error })
            }
        }

        void fetchData()

        // Use the cleanup function for avoiding a possibly...
        // ...state update after the component was unmounted
        return () => {
            cancelRequest.current = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url,forceUpdate])

    return state
}
