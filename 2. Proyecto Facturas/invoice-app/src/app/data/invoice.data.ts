import { Invoice } from "../models/invoice";

export const invoiceData: any = {

    id: 1,
    name:'Componentes de Pc',
    client: {
        name:'Sergio',
        lastname: 'Cabrera',
        address: {
            country: 'USA',
            city: 'Los Angeles',
            street: 'One Street',
            number: 15
        }

    },
    company: {
        name: 'New Age',
        fiscalNumber: 12313,

    },
    items: [
        {
            id:1,
            product: 'hosdhfls',
            price: 324,
            quantity: 1
        },
        {
            id:2,
            product: 'hodsfsssdhfls',
            price: 224,
            quantity: 1
        },
        {
            id:3,
            product: 'hofdgdhfls',
            price: 123,
            quantity: 2
        },
        
    ]

}