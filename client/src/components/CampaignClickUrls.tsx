import { Campaign } from "@/types";
import { generateClickUrl } from "@/utils/url";

interface CampaignClickUrlsProps {
    campaigns: Campaign[];
    selectedAffiliate: number;
}

const CampaignClickUrls: React.FC<CampaignClickUrlsProps> = ({ campaigns, selectedAffiliate }) => {

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Click Tracking URLs by Campaign</h2>
            <div className="space-y-3">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="border rounded-lg p-3">
                        <div className="font-medium text-gray-900 mb-2">{campaign.name}</div>
                        <div className="bg-gray-50 p-2 rounded text-sm">
                            <code className="break-all">{generateClickUrl(selectedAffiliate, campaign.id)}</code>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CampaignClickUrls;