import {Archivo} from "../archivo/archivo.model";
import {Microchip} from "../microchip/microchip.model";
import {Taxonomia} from "../taxonomia/taxonomia.model";

export class Animal {
  id?: any;
  nombre_criollo?: string;
  nombre_comun?: string;
  nombre_propio?: string;
  edad?: string;
  procedencia?: string;
  fecha_recepcion?: string;
  sexo?: string;
  estado_salud?: string;
  detalles_salud?: string;
  cod_int_id?: Microchip;
  especie_id?: Taxonomia;
  ruta_archivo_id?: Archivo;
}
