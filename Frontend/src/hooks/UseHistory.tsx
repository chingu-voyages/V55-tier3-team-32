import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { API_URL } from '../const.tsx';
import axios from 'axios';

interface HistoryItem {
    id: number;
    title: string;
    response: string;
   
}

export const useHistory = () => {
    const [userHistory, setUserHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { isLoggedIn } = useAuth();

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/quesris?timestamp=${Date.now()}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },  
            });
            setUserHistory(response.data);
        } catch (error) {
            console.error("Error fetching history:", error);
            setUserHistory([]);
        } finally {
            setLoading(false);
        }
    };
    const handleDeleteHistory = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/quesris/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setUserHistory(prevHistory => prevHistory.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting history item:", error);
        }
    };
    useEffect(() => {
        if (isLoggedIn) {
            fetchHistory();
        }
    }, [isLoggedIn]);

    const addToHistory = () => {
        fetchHistory();
    }

    return { userHistory, addToHistory , handleDeleteHistory, loading  };
}