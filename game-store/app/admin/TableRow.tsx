import React from 'react';
import TextData from './TableData/textData';

interface TableRowProps {
    data: any;
    index: number;
    setGames: React.Dispatch<React.SetStateAction<any[]>>;
}

const TableRow: React.FC<TableRowProps> = ({ data, index, setGames }) => {
    return (
        <tr>
            <td className="border border-[#ccc]">
                <TextData keyName="name" value={data.name} id={data._id.$oid} setGames={setGames} />
            </td>
            <td className="border border-[#ccc]">
                <TextData keyName="price" value={data.price} id={data._id.$oid} setGames={setGames} />
            </td>
            <td className="border border-[#ccc] p-2">{data.image}</td>
            <td className="border border-[#ccc] p-2">{data.category}</td>
            <td className="border border-[#ccc] p-2">{data.key_features}</td>
            <td className="border border-[#ccc]">
                <TextData keyName="brand_name" value={data.brand_name} id={data._id.$oid} setGames={setGames} />
            </td>
            <td className="border border-[#ccc]">
                <TextData keyName="description" value={data.description} id={data._id.$oid} setGames={setGames} />
            </td>
        </tr>
    );
};

export default TableRow;