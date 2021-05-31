

const initialData = {
    products: {
        'product-1': {id: 'product-1', title: '1'},
        'product-2': {id: 'product-2', title: '1'},
        'product-3': {id: 'product-3', title: '1'},
        'product-4': {id: 'product-4', title: '1'},
        'product-5': {id: 'product-5', title: '1'},
        'product-6': {id: 'product-6', title: '1'},
        'product-7': {id: 'product-7', title: '1'}
    },
    productsColumn: {
        products:{
            id: 'products',
            productIds: ['product-1', 'product-2', 'product-3', 'product-4', 'product-5', 'product-6', 'product-7']
        }
    },
    days: {
        'verti': {
            id: 'verti',
            productIds: [],
        },
        'vertitwo': {
            id: 'vertitwo',
            productIds: [],
        },
        'vertithree': {
            id: 'vertithree',
            productIds: [],
        },
        'vertifour': {
            id: 'vertifour',
            productIds: [],
        },
        'hori': {
            id: 'hori',
            productIds: [],
        },
    },
    daysOrder: ['verti','vertitwo','vertithree','vertifour','hori']

}
export default initialData;