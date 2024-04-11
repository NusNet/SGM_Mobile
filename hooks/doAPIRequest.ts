export default async function doRequest<T = unknown>(url: string, options?: RequestInit): Promise<T> {
    
    console.log("Dorequest data", url, options)

    const response = await fetch(url, options);
    if (!response.ok) {
        console.log("Not Ok Response",response)
        throw new Error(response.statusText || response.status.toString())
    }
    return (await response.json()) as T;
}