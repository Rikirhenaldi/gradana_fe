import axiosInstance from '@/utils/axiosInstance';

interface User {
    balance: Balance | any;
    topUpHistory: TopUpHistory | any;
    user: any;
    data: User | PromiseLike<User>;
}

interface TopUpHistory {
    id: string;
    userId: string;
    amount: number;
    date: string;
}

interface Balance {
    id: string;
    user: string
    amount: number,
}

// Fetch user data
export async function fetchUserDataAPI(): Promise<User> {
    try {
        const response = await axiosInstance.get<User>(`/api/user`);
        console.log(">>>>>>>>>>",response.data)
        return response?.data?.data;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error;
    }
}
