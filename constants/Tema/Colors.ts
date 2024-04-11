const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

type paletteNumberKey = {
  [key: number]: string
}

const COLORS =  {
  clar: {
    primari:   '#538CEA', //'#6e78ff',//'#abc4ff',
    primari75: '#538CEAbf',
    primari50: '#538CEA80',
    primari25: '#538CEA40',

    link: '#11A8CD',
    exit: '#20D18B', 
    alerta: '#E4A11B',
    error: '#DC4C64',
    alertaGroc: '#BBE64F',

    link50: '#11A8CD80',
    exit50: '#20D18B80', 
    alerta50: '#E4A11B80',
    error50: '#DC4C6480',
    alertaGroc50: '#BBE64F80',


    link25: '#11A8CD40',
    exit25: '#20D18B40', 
    alerta25: '#E4A11B40',
    error25: '#DC4C6440',
    alertaGroc25: '#BBE64F40',

    fonsBase: '#F3F3F3',
    fonsTargeta: '#FEFEFE',//'#F8F8F8',
    seleccionat: '#ccc',

    text: '#000',
    gris: {
      100:"#1f1f1f",
      200:"#262626",
      300:"#434343",
      400:"#595959",
      500:"#8c8c8c",
      600:"#bfbfbf",
      700:"#d9d9d9",
      800:"#ebebeb",
      900:"#f5f5f5",
    } as paletteNumberKey,

    blanc: '#fff',
    negre: '#000',

    entradaProducte: '#5F9EA0',
    sortidaProducte: '#CD853F',
    inventari: '#904DFF',

    entradaProducte25: '#5F9EA040',
    sortidaProducte25: '#CD853F40',
    inventari25: '#904DFF40',

    entradaProducte50: '#5F9EA080',
    sortidaProducte50: '#CD853F80',
    inventari50: '#904DFF80',

    paleta:  {
      0:"#daeaf6",
      1:"#ddedea",
      2:"#fcf4dd",
      3:"#fce1e4",
      4:"#e8dff5",
    } as paletteNumberKey,
    paletaFons:  {
      0:"#daeaf6",
      1:"#ddedea",
      2:"#fcf4dd",
      3:"#fce1e4",
      4:"#e8dff5",
    } as paletteNumberKey
  },
  fosc: {
    primari:   '#356ECC', //'#6e78ff',//'#abc4ff',
    primari75: '#356ECCbf',
    primari50: '#356ECC80',
    primari25: '#356ECC40',

    link: '#11A8CD',
    exit: '#20D18B', 
    alerta: '#E4A11B',
    error: '#DC4C64',
    alertaGroc: '#BBE64F',

    link50: '#11A8CD80',
    exit50: '#20D18B80', 
    alerta50: '#E4A11B80',
    error50: '#DC4C6480',
    alertaGroc50: '#BBE64F80',


    link25: '#11A8CD40',
    exit25: '#20D18B40', 
    alerta25: '#E4A11B40',
    error25: '#DC4C6440',
    alertaGroc25: '#BBE64F40',

    fonsBase: '#1a1a1a',
    fonsTargeta: '#252525',
    seleccionat: '#FFFFFF40',

    text: '#F9F9F9',
    gris: {
      100:"#f5f5f5",
      200:"#f0f0f0",
      300:"#d9d9d9",
      400:"#bfbfbf",
      500:"#8c8c8c",
      600:"#595959",
      700:"#434343",
      800:"#262626",
      900:"#1f1f1f",
    } as paletteNumberKey,

    blanc: '#fff',
    negre: '#000',

    entradaProducte: '#5F9EA0',
    sortidaProducte: '#CD853F',
    inventari: '#904DFF',

    entradaProducte25: '#5F9EA040',
    sortidaProducte25: '#CD853F40',
    inventari25: '#904DFF40',

    entradaProducte50: '#5F9EA080',
    sortidaProducte50: '#CD853F80',
    inventari50: '#904DFF80',

    paleta:  {
      0:"#daeaf6",
      1:"#ddedea",
      2:"#fcf4dd",
      3:"#fce1e4",
      4:"#e8dff5",
    } as paletteNumberKey,
    paletaFons:  {
      0:"#daeaf6",
      1:"#ddedea",
      2:"#fcf4dd",
      3:"#fce1e4",
      4:"#e8dff5",
    } as paletteNumberKey
  },
};

export default COLORS;