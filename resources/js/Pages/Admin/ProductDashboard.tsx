import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    PlusCircle,
    Search,
    MoreVertical,
    Pencil,
    Trash2,
    XCircle,
    CheckCircle2,
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
} from "@/Components/ui/alert-dialog";
import { useState } from "react";
import { Product } from "@/types/product";
import { Alert, AlertDescription } from "@/Components/ui/alert";

interface Props {
    products: Product[];
}

export default function ProductDashboard({ products }: Props) {
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const getStockPercentage = () => {
        return 75;
    };

    const handleDeleteClick = (productSlug: string) => {
        setProductToDelete(productSlug);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            router.delete(route("products.destroy", productToDelete), {
                onSuccess: () => {
                    setProductToDelete(null);
                    setShowSuccessAlert(true);
                    setTimeout(() => setShowSuccessAlert(false), 3000);
                },
                onError: (errors) => {
                    console.error("Delete failed:", errors);
                    setErrorMessage(
                        "Failed to delete product. Please try again."
                    );
                    setShowErrorAlert(true);
                    setTimeout(() => setShowErrorAlert(false), 3000);
                },
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Products Dashboard" />

            <div className="p-8 space-y-6">
                {showSuccessAlert && (
                    <Alert className="border-green-500 text-green-500">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertDescription>
                            Product successfully deleted.
                        </AlertDescription>
                    </Alert>
                )}

                {showErrorAlert && (
                    <Alert className="border-red-500 text-red-500">
                        <XCircle className="h-4 w-4" />
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Products</h1>
                        <p className="text-gray-600">
                            {products.length} total products
                        </p>
                    </div>
                    <Link href={route("products.create")}>
                        <button className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800">
                            <PlusCircle size={20} />
                            <span>Add New Product</span>
                        </button>
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
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white p-6 rounded-xl"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            product.images[0]?.image_path
                                                ? `/storage/${product.images[0].image_path}`
                                                : "/placeholder.jpg"
                                        }
                                        alt={product.name}
                                        className="w-16 h-16 rounded-xl object-cover"
                                    />
                                    <div>
                                        <h3 className="font-medium text-lg">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {product.description.substring(
                                                0,
                                                50
                                            )}
                                            {product.description.length > 50
                                                ? "..."
                                                : ""}
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
                                                    product.slug
                                                )}
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <Pencil size={16} />
                                                <span>Edit Product</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleDeleteClick(product.slug)
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
                                            Stock Status
                                        </span>
                                        <span className="text-sm font-medium">
                                            In Stock
                                        </span>
                                    </div>
                                    <Progress
                                        value={getStockPercentage()}
                                        className="h-2"
                                    />
                                </div>

                                <div className="pt-4 border-t">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">
                                            Rp{" "}
                                            {Number(product.price).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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