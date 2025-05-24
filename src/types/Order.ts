export interface Order {
    id: number;
    user: {
        id: number;
        username: string;
        email: string;
        credit: number;
        status: string;
    };
    plan: {
        id: number;
        name: string;
        credit: number;
        hour: string;
        price: number;
        status: string;
        month: string;
        description: string;
        days: number;
        createdDate: string;
        updatedDate: string;
    };
    price: number;
    codeVoucher: string;
    discount: number;
    finalPrice: number;
    status: string;
    codePayment: string;
    timeUsed: number;
    createdDate: string;
    updatedDate: string;
    expiredDate: string;
};
