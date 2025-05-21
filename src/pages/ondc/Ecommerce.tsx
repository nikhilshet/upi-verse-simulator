import ServiceSlider from "@/components/shared/ServiceSlider"
import ServiceSlider2 from "@/components/shared/ServiceSlider2"
import { Input } from "@/components/ui/input"
import { Send, ArrowDownLeft, RefreshCw, Search } from 'lucide-react'
import ondc from '../../assets/ondc.png'
const Ecommerce = () => {
    const services = [
        { id: 'mens', name: 'Mens', icon: 'https://i.pravatar.cc/300?img=1', color: 'text-red-200' },
        { id: 'womens', name: 'Womens', icon: 'https://i.pravatar.cc/300?img=1', color: 'text-red-200' },
        { id: 'kids', name: 'Kids', icon: 'https://i.pravatar.cc/300?img=1', color: 'text-red-200' },
        { id: 'life', name: 'Lifestyle', icon: 'https://i.pravatar.cc/300?img=1', color: 'text-red-200' },
        { id: 'decor', name: 'HomeDecor', icon: 'https://i.pravatar.cc/300?img=1', color: 'text-red-200' },
        { id: 'elect', name: 'Electronics', icon: 'https://i.pravatar.cc/300?img=1', color: 'text-red-200' },
    ]
const fashionItems = [
  {
    id: 1,
    name: "Casual Sunglasses",
    image: "https://images.unsplash.com/photo-1602810311491-d943a1eeedc7?auto=format&fit=crop&w=600&q=80",
    originalPrice: 999,
    discountedPrice: 749,
    offerPercent: Math.round(((999 - 749) / 999) * 100),
  },
  {
    id: 2,
    name: "Denim Jacket",
    image: "https://images.unsplash.com/photo-1618354691215-c1c7dfe338d6?auto=format&fit=crop&w=600&q=80",
    originalPrice: 2500,
    discountedPrice: 1999,
    offerPercent: Math.round(((2500 - 1999) / 2500) * 100),
  },
  {
    id: 3,
    name: "Running Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    originalPrice: 4000,
    discountedPrice: 2999,
    offerPercent: Math.round(((4000 - 2999) / 4000) * 100),
  },
  {
    id: 4,
    name: "Men's Sunglasses",
    image: "https://images.unsplash.com/photo-1575918126584-62b97e9cfb59?auto=format&fit=crop&w=600&q=80",
    originalPrice: 1500,
    discountedPrice: 999,
    offerPercent: Math.round(((1500 - 999) / 1500) * 100),
  },
  {
    id: 5,
    name: "Women's Handbag",
    image: "https://images.unsplash.com/photo-1618354691210-4558a65152c4?auto=format&fit=crop&w=600&q=80",
    originalPrice: 2800,
    discountedPrice: 2100,
    offerPercent: Math.round(((2800 - 2100) / 2800) * 100),
  },
  {
    id: 6,
    name: "Formal Shoes",
    image: "https://images.unsplash.com/photo-1562158070-8b683c2fbc0f?auto=format&fit=crop&w=600&q=80",
    originalPrice: 3500,
    discountedPrice: 2750,
    offerPercent: Math.round(((3500 - 2750) / 3500) * 100),
  },
  {
    id: 7,
    name: "Wrist Watch",
    image: "https://images.unsplash.com/photo-1606813909354-2603bcbaba0b?auto=format&fit=crop&w=600&q=80",
    originalPrice: 3200,
    discountedPrice: 2499,
    offerPercent: Math.round(((3200 - 2499) / 3200) * 100),
  },
  {
    id: 8,
    name: "Hoodie Sweatshirt",
    image: "https://images.unsplash.com/photo-1618354691214-7c3782caaa50?auto=format&fit=crop&w=600&q=80",
    originalPrice: 1800,
    discountedPrice: 1399,
    offerPercent: Math.round(((1800 - 1399) / 1800) * 100),
  },
  {
    id: 9,
    name: "Women's Scarf",
    image: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?auto=format&fit=crop&w=600&q=80",
    originalPrice: 799,
    discountedPrice: 599,
    offerPercent: Math.round(((799 - 599) / 799) * 100),
  },
  {
    id: 10,
    name: "Leather Belt",
    image: "https://images.unsplash.com/photo-1608250822639-e162160b9680?auto=format&fit=crop&w=600&q=80",
    originalPrice: 1299,
    discountedPrice: 899,
    offerPercent: Math.round(((1299 - 899) / 1299) * 100),
  },
  {
    id: 11,
    name: "Sports Cap",
    image: "https://images.unsplash.com/photo-1606814739233-799b4a2f77df?auto=format&fit=crop&w=600&q=80",
    originalPrice: 499,
    discountedPrice: 349,
    offerPercent: Math.round(((499 - 349) / 499) * 100),
  },
  {
    id: 12,
    name: "Slim Fit Jeans",
    image: "https://images.unsplash.com/photo-1602810311796-6d9462f59d2f?auto=format&fit=crop&w=600&q=80",
    originalPrice: 2200,
    discountedPrice: 1699,
    offerPercent: Math.round(((2200 - 1699) / 2200) * 100),
  }
];


    const products = fashionItems.map((item, index) => {
        return (
            <div key={index} className="flex flex-col h-64 p-2 rounded-md justify-between">

                <img src={`https://i.pravatar.cc/300?img=${index}`} alt="" className="h-48" />
                <div className="flex flex-col">
                    <h2 className="text-gray-600 font-bold">{item.name}</h2>
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-medium"> ₹{item.discountedPrice}</p>
                        <p className="text-gray-400 text-lg"><s>₹{item.originalPrice}</s></p>
                        <p className="text-green-500 text-lg">{item.offerPercent}%</p>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <>
            <div className="flex flex-col">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        className="pl-10"
                        type="text"
                        placeholder="Search for a product"
                    />
                </div>
                <ServiceSlider2 services={services} classProps="bg-white dark:bg-gray-800/90 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800/90 mb-6" />
                <div className="flex justify-center rounded-md border border-blue-400 items-center mb-6 ">
                    <div >
                        <p className="text-lg text-center"><span className="text-blue-500">SHOP </span>THROUGH ONDC</p>
                        
                    </div>
                    <img src={ondc} alt="" className="w-36" />
                </div>
                <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-800/90 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800/90">
                    {products}
                </div>
            </div>
        </>
    )
}
export default Ecommerce