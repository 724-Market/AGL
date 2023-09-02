export interface TableRequest {
    draw: number
    columns: Columns[]
    order: Order[]
    start: number
    length: number
    search: Search
    Filter: Filter[]
}
export interface Columns {
    data: string
    name: string
    searchable: boolean
    orderable: boolean
    search: Search
}
export interface Search {
    value: string
    regex: string
}
export interface Order {
    column: number
    dir: string
}
export interface Filter {
    field: string
    type: string
    value: string
}
