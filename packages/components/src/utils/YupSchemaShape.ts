import * as yup from "yup"

export type YupSchemaShape<T> = Record<keyof Required<T>, yup.AnySchema>
