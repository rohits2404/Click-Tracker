"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Affiliate, Campaign, AffiliateData } from '../types';
import AffiliateSelection from '../components/AffiliateSelection';
import PostbackUrl from '../components/PostBackUrl';
import CampaignClickUrls from '../components/CampaignClickUrls';
import AffiliateDashboard from '../components/AffiliateDashboard';
import HowItWorks from '../components/HowItWorks';

export default function Dashboard() {

    const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [selectedAffiliate, setSelectedAffiliate] = useState<number | null>(null);
    const [affiliateData, setAffiliateData] = useState<AffiliateData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAffiliates();
        fetchCampaigns();
    }, []);

    useEffect(() => {
        if (selectedAffiliate) {
            fetchAffiliateData(selectedAffiliate);
        }
    }, [selectedAffiliate]);

    const fetchAffiliates = async () => {
        try {
            const response = await axios.get('/api/affiliates');
            setAffiliates(response.data);
        } catch (error) {
            console.error('Error fetching affiliates:', error);
        }
    };

    const fetchCampaigns = async () => {
        try {
            const response = await axios.get('/api/campaigns');
            setCampaigns(response.data);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    };

    const fetchAffiliateData = async (affiliateId: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/affiliate/${affiliateId}`);
            setAffiliateData(response.data);
        } catch (error) {
            console.error('Error fetching affiliate data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <AffiliateSelection
            affiliates={affiliates}
            selectedAffiliate={selectedAffiliate}
            setSelectedAffiliate={setSelectedAffiliate}
            />
            {selectedAffiliate && (
                <>
                    <PostbackUrl affiliateId={selectedAffiliate} />
                    <CampaignClickUrls campaigns={campaigns} selectedAffiliate={selectedAffiliate} />
                    <AffiliateDashboard affiliateData={affiliateData} loading={loading} />
                </>
            )}
            <HowItWorks />
        </div>
    );
}