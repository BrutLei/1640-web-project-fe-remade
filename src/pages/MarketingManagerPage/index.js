import AdminHeader from "../../component/AdminHeader";
import React from "react";

const MarketingManagerPage = () => {
    return (
        <>
            <AdminHeader />
            <h1 className="text-4xl font-bold text-center mt-8 mb-4">Marketing Manager Page</h1>
            <div className="mt-8"> 
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Faculty</th>
                            <th className="border px-4 py-2">Articles Link</th>
                            <th className="border px-4 py-2">Deadline</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example data  */}
                        <tr>
                            <td className="border px-4 py-2">1</td>
                            <td className="border px-4 py-2"> Name 1</td>
                            <td className="border px-4 py-2">Faculty 1</td>
                            <td className="border px-4 py-2">
                                <a href="https://example.com/article1" target="_blank" rel="noopener noreferrer">
                                    https://example.com/article1
                                </a>
                            </td>
                            <td className="border px-4 py-2">2024-04-10</td>
                            <td className="border px-4 py-2 text-green-600">Article on time</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">2</td>
                            <td className="border px-4 py-2"> Name 2</td>
                            <td className="border px-4 py-2">Faculty 2</td>
                            <td className="border px-4 py-2">
                                <a href="https://example.com/article2" target="_blank" rel="noopener noreferrer">
                                    https://example.com/article2
                                </a>
                            </td>
                            <td className="border px-4 py-2">2024-03-20</td>
                            <td className="border px-4 py-2 text-red-600">Overdue article</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </>
    );
    
};

export default MarketingManagerPage;
