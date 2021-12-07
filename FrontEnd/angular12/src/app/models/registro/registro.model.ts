import {Operador} from "../operador/operador.model";
import {Animal} from "../animal/animal.model";

export class Registro {
  id?: any;
  nro_acta_decomiso?: number;
  fecha_registro?: string;
  CCFS?: string;
  modalidad_funcionamiento?: string;
  area?: string;
  lugar_exposicion?: string;
  motivo_recepcion?: string;
  nro_acta_traslado?: number;
  nro_MMAA?: number;
  id_animal_id?: Animal;
  ci_autorizado_por_id?: Operador;
  ci_recibido_por_id?: Operador;
}
