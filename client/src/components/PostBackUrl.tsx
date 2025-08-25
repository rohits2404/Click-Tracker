import { generatePostbackUrl } from "@/utils/url";

interface PostbackUrlProps {
    affiliateId: number;
}

const PostBackUrl: React.FC<PostbackUrlProps> = ({ affiliateId }) => {
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Your Postback URL</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm break-all">{generatePostbackUrl(affiliateId)}</code>
            </div>
            <p className="text-sm text-gray-600 mt-2">
                Advertisers will use this URL to notify you when conversions happen.
            </p>
        </div>
    );
};

export default PostBackUrl;