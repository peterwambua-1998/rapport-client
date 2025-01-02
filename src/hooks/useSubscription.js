import { useState, useEffect } from 'react';
import { getSubscriptions, createSubscription, updateSubscription, cancelSubscription } from '../services/api/api';
import useAuth from './useAuth';

const useSubscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchSubscriptions();
  }, [user]);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await getSubscriptions();
      setSubscriptions(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async (planId) => {
    try {
      const response = await createSubscription({ planId });
      setSubscriptions([...subscriptions, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to create subscription');
      throw err;
    }
  };

  const updateSubscriptionPlan = async (subscriptionId, newPlanId) => {
    try {
      const response = await updateSubscription(subscriptionId, { planId: newPlanId });
      setSubscriptions(subscriptions.map(sub => 
        sub.id === subscriptionId ? response.data : sub
      ));
      return response.data;
    } catch (err) {
      setError('Failed to update subscription');
      throw err;
    }
  };

  const cancelUserSubscription = async (subscriptionId) => {
    try {
      await cancelSubscription(subscriptionId);
      setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionId));
    } catch (err) {
      setError('Failed to cancel subscription');
      throw err;
    }
  };

  return {
    subscriptions,
    loading,
    error,
    subscribe,
    updateSubscriptionPlan,
    cancelUserSubscription,
    refreshSubscriptions: fetchSubscriptions
  };
};

export default useSubscription;