export const WEB_SERVICE_URL = "https://www.movistar.com.ar/";

export const MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export const COMPLETE_MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const apis = {
  TSP_LOGIN: "/TSP_LOGIN",
  TSP_CARGAR_DATOS_MENU: "/TSP_CARGAR_DATOS_MENU",
  TSP_DETALLE_MOVIMIENTOS: "/TSP_DETALLE_MOVIMIENTOS",
  TSP_CABECERA_MOVIMIENTOS: "/TSP_CABECERA_MOVIMIENTOS",
  TSP_INGRESO_EGRESO_CUENTA: "/TSP_INGRESO_EGRESO_CUENTA",
  TSP_LISTAR_BANCOS_VZLA_DIST: "/TSP_LISTAR_BANCOS_VZLA_DIST",
  TSP_LISTAR_BANCO_CUENTAS_TRANS: "/TSP_LISTAR_BANCO_CUENTAS_TRANS",
  TSP_INSERT_TRASLADO_CUENTA: "/TSP_INSERT_TRASLADO_CUENTA",
  TSP_ELIMINAR_MOVIMIENTO_CUENTAS: "/TSP_ELIMINAR_MOVIMIENTO_CUENTAS",
  TSP_DATOS_MOVI_CUENTA: "/TSP_DATOS_MOVI_CUENTA",
  TSP_UPDATE_INGRESO_EGRESO_CUENTA: "/TSP_UPDATE_INGRESO_EGRESO_CUENTA",
  TSP_ESTADO_TRANSACCIONES_APP: "/TSP_ESTADO_TRANSACCIONES_APP",
  TSP_DATOS_TRANSACCIONES: "/TSP_DATOS_TRANSACCIONES",
  TSP_CAMBIAR_ESTADO_TRANS: "/TSP_CAMBIAR_ESTADO_TRANS",
  TSP_LISTAR_TRANSACCIONES_PENDIENTES: "/TSP_LISTAR_TRANSACCIONES_PENDIENTES",
  TSP_APROBAR_OPERACION_NUEVO: "/TSP_APROBAR_OPERACION_NUEVO",
  TSP_OBS_OPERACION: "/TSP_OBS_OPERACION",
  TSP_LISTAR_TRANSACCIONES_ENVIADAS: "/TSP_LISTAR_TRANSACCIONES_ENVIADAS",
  TSP_CARGAR_DATOS_MENU_TRANSFERIDOR: "/TSP_CARGAR_DATOS_MENU_TRANSFERIDOR",
  TSP_CARGAR_DATOS_MENU_TRANSFERIDOR_CUENTAS: "/TSP_CARGAR_DATOS_MENU_TRANSFERIDOR_CUENTAS",
  TSP_LISTAR_TIENDA: "/TSP_LISTAR_TIENDA",
  TSP_LISTAR_MONEDA_ENVIA: "/TSP_LISTAR_MONEDA_ENVIA",
  TSP_LISTAR_MONEDA_RECIBE: "/TSP_LISTAR_MONEDA_RECIBE",
  TSP_GRABAR_TIPO_DE_CAMBIO_NEW: "/TSP_GRABAR_TIPO_DE_CAMBIO_NEW"
};

export const MINUTE_IN_MILISECONDS = 60000;

export const HOUR_IN_MILISECONDS = MINUTE_IN_MILISECONDS * 60;

export const DAY_IN_MILISECONDS = HOUR_IN_MILISECONDS * 24;
