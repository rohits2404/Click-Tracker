import { Affiliate } from '../types';

interface AffiliateSelectionProps {
    affiliates: Affiliate[];
    selectedAffiliate: number | null;
    setSelectedAffiliate: (affiliateId: number) => void;
}

const AffiliateSelection: React.FC<AffiliateSelectionProps> = ({ affiliates, selectedAffiliate, setSelectedAffiliate }) => {
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Select Affiliate</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {affiliates.map((affiliate) => (
                    <button
                        key={affiliate.id}
                        onClick={() => setSelectedAffiliate(affiliate.id)}
                        className={`p-4 border rounded-lg text-center transition-colors ${selectedAffiliate === affiliate.id ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                    >
                        <div className="font-medium">{affiliate.name}</div>
                        <div className="text-sm text-gray-500">ID: {affiliate.id}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AffiliateSelection;