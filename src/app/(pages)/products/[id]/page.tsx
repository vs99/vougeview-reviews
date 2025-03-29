"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import RatingStars from "@/app/components/RatingStars";
import ReviewCard from "@/app/components/ReviewCard";
import { Button } from "@/components/ui/button";

// Mock products data
const products = [
  {
    id: 1,
    title: "Advanced Night Repair Serum",
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewCount: 352,
    description:
      "Advanced Night Repair Synchronized Multi-Recovery Complex. Reduces multiple signs of aging caused by modern life.",
    price: "$75.00",
    features: [
      "Patented synchronization technology",
      "Reduces fine lines and wrinkles",
      "Improves radiance and evens skin tone",
      "Strengthens skin barrier",
      "Oil-free formula",
    ],
    details: [
      { label: "Size", value: "30ml" },
      { label: "Item Form", value: "Serum" },
      { label: "Skin Type", value: "All Skin Types" },
      { label: "Brand", value: "Estée Lauder" },
    ],
    variants: [
      { id: 101, size: "30ml", price: "$75.00" },
      { id: 102, size: "50ml", price: "$105.00" },
      { id: 103, size: "100ml", price: "$185.00" },
    ],
    longDescription: `Advanced Night Repair Synchronized Multi-Recovery Complex is a revolutionary anti-aging serum that works at night when skin naturally renews. This powerful nighttime renewal serum maximizes the power of skin's natural nighttime renewal with our exclusive ChronoluxCB Technology. It helps skin increase its natural renewal of fresh new cells and production of natural collagen for firmer skin. Tested on a diverse panel, it addresses all key signs of aging, plus the look of various skin tones and texture. It dramatically reduces the look of lines, wrinkles, and pores, revealing smoother skin. It improves radiance and evens skin tone. This advanced formula also strengthens skin's barrier to lock in moisture, helps skin build natural protection against environmental damage, and works to resist the look of visible aging from modern day stressors like blue light and pollution.`,
  },
  {
    id: 2,
    title: "Pro Display XDR Monitor",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewCount: 127,
    description:
      "A professional display with Retina 6K resolution, amazing color accuracy, and incredible HDR performance.",
    price: "$4,999.00",
    features: [
      "32-inch Retina 6K display",
      "P3 wide color gamut and 10-bit color depth",
      "XDR (Extreme Dynamic Range)",
      "Superwide viewing angle",
      "Reference modes for different workflows",
    ],
    details: [
      { label: "Display Size", value: "32 inches" },
      { label: "Resolution", value: "6K (6016 x 3384)" },
      { label: "Panel Type", value: "IPS LCD with oxide TFT" },
      { label: "Brand", value: "Apple" },
    ],
    variants: [
      { id: 201, finish: "Standard glass", price: "$4,999.00" },
      { id: 202, finish: "Nano-texture glass", price: "$5,999.00" },
    ],
    longDescription: `The Pro Display XDR is a 32-inch flat panel computer monitor created by Apple and released on December 10, 2019, alongside the redesigned Mac Pro. It has a 6K resolution (6016×3384 pixels) and a 16:9 aspect ratio. The monitor's chassis has a lattice pattern of holes on the back, similar to the design of the new Mac Pro, which doubles as a heat sink. It has a brightness of 1,000 nits (typical) with a max of 1,600 nits, a 1,000,000:1 contrast ratio, and P3 wide color gamut support with 10-bit color depth. It has a superwide viewing angle and reference modes for different workflows. The Pro Stand is sold separately for $999 and uses a magnetic connector to attach to the monitor. The monitor can be purchased with a standard glossy glass or with a nano-texture matte glass for an additional $1,000.`,
  },
  {
    id: 3,
    title: "Luxury Down Comforter",
    category: "Home & Garden",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewCount: 208,
    description:
      "Premium all-season down comforter with cotton shell, baffle box construction for maximum loft and warmth.",
    price: "$199.00",
    features: [
      "600 fill power white goose down",
      "100% Egyptian cotton cover",
      "Baffle box construction",
      "Cornerstone ties",
      "All-season weight",
    ],
    details: [
      { label: "Size", value: "Queen" },
      { label: "Material", value: "White Goose Down" },
      { label: "Thread Count", value: "400" },
      { label: "Brand", value: "Brooklinen" },
    ],
    variants: [
      { id: 301, size: "Twin/Twin XL", price: "$179.00" },
      { id: 302, size: "Full/Queen", price: "$199.00" },
      { id: 303, size: "King/Cal King", price: "$229.00" },
    ],
    longDescription: `Our Luxury Down Comforter is the pinnacle of comfort and warmth. Crafted with premium 600 fill power white goose down and encased in a 100% Egyptian cotton shell with a silky-smooth 400 thread count, this comforter offers the perfect balance of lightweight feel and cozy warmth. The innovative baffle box construction prevents the down from shifting and creates maximum loft for superior insulation. Corner ties secure the comforter to your duvet cover, ensuring it stays perfectly in place all night long. Designed as an all-season weight comforter, it provides ideal warmth for year-round comfort—not too hot, not too cold. Each comforter is Oeko-Tex certified, meaning it's been tested for harmful substances and is safe for you and your family. Experience the luxury of hotel-quality bedding in the comfort of your own home with our Luxury Down Comforter.`,
  },
  {
    id: 4,
    title: "Model X SUV",
    category: "Cars",
    image:
      "https://images.unsplash.com/photo-1633240188018-1100c307e445?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviewCount: 95,
    description:
      "All-electric SUV with long range, room for up to seven, and Falcon Wing doors for easy access to the second and third row seats.",
    price: "$79,990",
    features: [
      "Up to 371 miles of estimated range",
      "Falcon Wing doors",
      "0-60 mph in 3.8 seconds",
      "Seating for up to 7 adults",
      "Autopilot capabilities",
    ],
    details: [
      { label: "Range", value: "Up to 371 miles" },
      { label: "Acceleration", value: "0-60 mph in 3.8 seconds" },
      { label: "Top Speed", value: "155 mph" },
      { label: "Brand", value: "Tesla" },
    ],
    variants: [
      { id: 401, model: "Model X", price: "$79,990" },
      { id: 402, model: "Model X Plaid", price: "$104,990" },
    ],
    longDescription: `The Tesla Model X is an all-electric luxury crossover SUV made by Tesla, Inc. The vehicle is notable for its falcon-wing doors, which are hinged at the roof rather than the side and open upward. The Model X has an EPA size class of SUV, and shares many components with the Model S, including the same platform. The Model X offers exceptional range capability, with up to 371 miles on a single charge. It accelerates from 0-60 mph in just 3.8 seconds (or 2.5 seconds for the Plaid version), making it one of the quickest SUVs on the market. Inside, the Model X features a minimalist design dominated by a 17-inch touchscreen that controls most of the vehicle's functions. The SUV can seat up to seven adults comfortably and offers best-in-class storage capacity with both front and rear trunks. Advanced safety features include automatic emergency braking, collision warning, and Autopilot capabilities that bring the vehicle closer to semi-autonomous driving.`,
  },
];

// Mock reviews data
const reviews = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      reviews: 28,
    },
    rating: 5,
    title: "Absolutely beautiful results!",
    content:
      "I've been using this serum for a month and the results are incredible. My skin looks more radiant, and fine lines are noticeably reduced. I apply it every night before bed and wake up to glowing skin. Would highly recommend to anyone looking to improve their skincare routine.",
    date: "2023-11-15T12:00:00Z",
    helpfulCount: 42,
    productId: 1,
    productName: "Advanced Night Repair Serum",
    verified: true,
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      reviews: 14,
    },
    rating: 4.5,
    title: "Great display, but expensive",
    content:
      "The Pro Display XDR is stunning to look at and works perfectly for my design work. Colors are incredibly accurate, and the 6K resolution makes everything look crisp. The only drawback is the price, especially when you add the stand. If you're a professional who needs color accuracy though, it's worth the investment.",
    date: "2023-10-22T15:30:00Z",
    helpfulCount: 28,
    productId: 2,
    productName: "Pro Display XDR Monitor",
    verified: true,
  },
  {
    id: 3,
    user: {
      name: "Emily Rodriguez",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      reviews: 7,
    },
    rating: 4,
    title: "Good value for the price",
    content:
      "I've been using this serum for about two weeks and I'm already seeing results. My skin feels smoother and looks brighter. The bottle is small for the price, but a little goes a long way. The dropper makes it easy to apply just the right amount.",
    date: "2023-09-05T09:15:00Z",
    helpfulCount: 18,
    productId: 1,
    productName: "Advanced Night Repair Serum",
    verified: true,
  },
  {
    id: 4,
    user: {
      name: "David Wilson",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      reviews: 22,
    },
    rating: 5,
    title: "Best comforter I've ever owned",
    content:
      "This comforter is absolutely worth every penny! It's the perfect weight - warm enough for winter but not too hot. The construction is excellent and the down doesn't shift around. I've had many comforters over the years and this is by far the best quality.",
    date: "2023-08-12T14:25:00Z",
    helpfulCount: 35,
    productId: 3,
    productName: "Luxury Down Comforter",
    verified: true,
  },
  {
    id: 5,
    user: {
      name: "Alex Thompson",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      reviews: 9,
    },
    rating: 4.5,
    title: "Amazing performance, but range could be better",
    content:
      "The Model X exceeds expectations in almost every category. The acceleration is mind-blowing, especially for an SUV of this size. Interior space is excellent and the falcon-wing doors are not just a gimmick - they're actually practical for loading kids and cargo. My only complaint is that real-world range is about 15% less than advertised, especially in cold weather. Still, it's the best car I've ever owned.",
    date: "2023-07-29T10:40:00Z",
    helpfulCount: 22,
    productId: 4,
    productName: "Model X SUV",
    verified: true,
  },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [productReviews, setProductReviews] = useState<any[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch product details
    const fetchData = async () => {
      // In a real app, you'd fetch data from a server
      const productId = parseInt(id as string);
      const foundProduct = products.find((p) => p.id === productId);
      const foundReviews = reviews.filter((r) => r.productId === productId);

      setProduct(foundProduct || null);
      setProductReviews(foundReviews || []);
      if (foundProduct?.variants?.length) {
        setSelectedVariant(foundProduct.variants[0]);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Product not found
          </h2>
          <p className="mt-4 text-gray-500">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-300 mx-2">/</span>
              <Link
                href={`/categories/${product.category.toLowerCase()}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {product.category}
              </Link>
            </li>
            <li>
              <span className="text-gray-300 mx-2">/</span>
              <span className="text-gray-900">{product.title}</span>
            </li>
          </ol>
        </nav>

        {/* Product section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <div className="mt-2 flex items-center">
              <RatingStars rating={product.rating} />
              <span className="ml-2 text-gray-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mt-4">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">
                {selectedVariant?.price || product.price}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>

            {/* Variants section */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Options</h3>
                <div className="mt-2">
                  <div className="grid grid-cols-3 gap-4">
                    {product.variants.map((variant: any) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`border rounded-md py-2 px-3 flex items-center justify-center text-sm font-medium ${
                          selectedVariant?.id === variant.id
                            ? "border-indigo-500 text-indigo-600"
                            : "border-gray-300 text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {variant.size || variant.finish || variant.model}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-8 flex flex-col space-y-4">
              <Button className="w-full">Buy Now</Button>
              <Button variant="outline" className="w-full">
                Add to Wishlist
              </Button>
            </div>

            {/* Product features */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Highlights</h3>
              <ul className="mt-2 pl-4 list-disc text-gray-600 space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Product details */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Details</h3>
              <dl className="mt-2 divide-y divide-gray-200">
                {product.details.map(
                  (detail: { label: string; value: string }, index: number) => (
                    <div key={index} className="py-2 flex justify-between">
                      <dt className="text-gray-500">{detail.label}</dt>
                      <dd className="font-medium text-gray-900">
                        {detail.value}
                      </dd>
                    </div>
                  )
                )}
              </dl>
            </div>
          </div>
        </div>

        {/* Long description */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">
            Product Description
          </h2>
          <div className="mt-6 prose prose-indigo prose-lg text-gray-600 mx-auto">
            <p>{product.longDescription}</p>
          </div>
        </div>

        {/* Reviews section */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center">
              <RatingStars rating={product.rating} size="lg" />
              <p className="ml-3 text-lg font-medium text-gray-900">
                {product.rating} out of 5 stars
              </p>
            </div>
            <Button>Write a Review</Button>
          </div>

          {/* Rating breakdown */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Rating Breakdown
              </h3>
              <div className="mt-3 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center">
                    <div className="w-20 text-sm font-medium text-gray-900">
                      {star} stars
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="h-3 rounded-full bg-gray-200">
                        <div
                          className="h-3 rounded-full bg-yellow-400"
                          style={{
                            width: `${Math.random() * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Review Highlights
              </h3>
              <div className="mt-3 space-y-2">
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex items-center">
                    <RatingStars rating={5} size="sm" />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Best purchase ever!
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">From 12 reviews</p>
                </div>
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex items-center">
                    <RatingStars rating={4} size="sm" />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Worth the price
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">From 8 reviews</p>
                </div>
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex items-center">
                    <RatingStars rating={3} size="sm" />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Good but expensive
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">From 5 reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer reviews */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Reviews
            </h3>
            <div className="mt-4 space-y-6">
              {productReviews.length > 0 ? (
                productReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    id={review.id}
                    user={review.user}
                    rating={review.rating}
                    title={review.title}
                    content={review.content}
                    date={review.date}
                    helpfulCount={review.helpfulCount}
                    productId={review.productId}
                    productName={review.productName}
                    verified={review.verified}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No reviews yet for this product.
                  </p>
                  <Button className="mt-4">Be the first to review</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
