import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
// import { Product } from "@/types/product";
import {
    PlusCircle,
    Search,
    MoreVertical,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Progress } from "@/Components/ui/progress";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { useState } from "react";

interface Props {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    totalProducts: number;
}

interface SizeStock {
    id: number;
    product_id: number;
    size: string;
    stock: number;
}

interface Product {
    id: number;
    title: string;
    Description: string;
    Price: number;
    Slug: string;
    image: string;
    size_stock: SizeStock;
    created_at: string;
    updated_at: string;
}

export default function ProductDashboard({ products, totalProducts }: Props) {
    const [productToDelete, setProductToDelete] = useState<number | null>(null);

    const getStockPercentage = (product: Product) => {
        const maxStock = 100;
        return ((product.size_stock?.stock || 0) / maxStock) * 100;
    };

    const handleDeleteClick = (productId: number) => {
        setProductToDelete(productId);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            router.delete(route("products.destroy", productToDelete));
            setProductToDelete(null);
        }
    };

    return (
        <AdminLayout>
            <Head title="Products Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Products</h1>
                        <p className="text-gray-600">
                            {totalProducts} total products
                        </p>
                    </div>
                    <Link
                        href={route("products.create")}
                        className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                        <PlusCircle size={20} />
                        <span>Add New Product</span>
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl p-4">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.data.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white p-6 rounded-xl"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-16 h-16 rounded-xl object-cover"
                                    />
                                    <div>
                                        <h3 className="font-medium text-lg">
                                            {product.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Size: {product.size_stock?.size}
                                        </p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreVertical size={20} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={route(
                                                    "products.edit",
                                                    product.id
                                                )}
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <Pencil size={16} />
                                                <span>Edit Product</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleDeleteClick(product.id)
                                            }
                                            className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                                        >
                                            <Trash2 size={16} />
                                            <span>Remove Product</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-600">
                                            Sales
                                        </span>
                                        <span className="text-sm font-medium">
                                            1269
                                        </span>
                                    </div>
                                    <Progress value={75} className="h-2" />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-600">
                                            Stock
                                        </span>
                                        <span className="text-sm font-medium">
                                            {product.size_stock?.stock || 0}
                                        </span>
                                    </div>
                                    <Progress
                                        value={getStockPercentage(product)}
                                        className="h-2"
                                    />
                                </div>

                                <div className="pt-4 border-t">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">
                                            ${product.Price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {products.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                        <Link
                            href={products.links[0].url || ""}
                            className={`p-2 rounded-lg transition-colors ${
                                !products.links[0].url
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white hover:bg-gray-50"
                            }`}
                            preserveScroll
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Link>

                        <div className="flex items-center gap-1">
                            {products.links.slice(1, -1).map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || ""}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        link.active
                                            ? "bg-blue-50 text-blue-600 font-medium"
                                            : "bg-white hover:bg-gray-50"
                                    }`}
                                    preserveScroll
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <Link
                            href={
                                products.links[products.links.length - 1].url ||
                                ""
                            }
                            className={`p-2 rounded-lg transition-colors ${
                                !products.links[products.links.length - 1].url
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white hover:bg-gray-50"
                            }`}
                            preserveScroll
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                )}

                {/* Page Info */}
                <div className="text-center text-sm text-gray-600">
                    Showing{" "}
                    {(products.current_page - 1) * products.per_page + 1} to{" "}
                    {Math.min(
                        products.current_page * products.per_page,
                        products.total
                    )}{" "}
                    of {products.total} products
                </div>
            </div>

            <AlertDialog
                open={productToDelete !== null}
                onOpenChange={() => setProductToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the product.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AdminLayout>
    );
}
