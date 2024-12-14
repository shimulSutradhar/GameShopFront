import React from 'react';

interface TableRowProps {
    data: any;
    index: number;
    setGames: React.Dispatch<React.SetStateAction<any[]>>;
}

const TableRow: React.FC<TableRowProps> = ({ data, index, setGames }) => {
    return (
        <tr>
            <td className="border border-black p-2">{data.name}</td>
            <td className="border border-black p-2">{data.price}</td>
            <td className="border border-black p-2">{data.image}</td>
            <td className="border border-black p-2">{data.category}</td>
            <td className="border border-black p-2">{data.key_features}</td>
            <td className="border border-black p-2">{data.brand_name}</td>
            <td className="border border-black p-2">{data.description}</td>
        </tr>
    );
};

export default TableRow;