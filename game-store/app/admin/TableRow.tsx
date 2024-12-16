import React, { useEffect } from 'react';
import TextData from './TableData/textData';
import ListPrint from './TableData/ListPrint';
import ImageHandler from './TableData/ImageHandler';

interface TableRowProps {
    data: any;
    index: number;
    games: any[]
    setGames: React.Dispatch<React.SetStateAction<any[]>>;
}

const TableRow: React.FC<TableRowProps> = ({ data, index, games, setGames }) => {
    console.log("Checking data", data.catagory);
    return (
        <tr>
            <td className="border border-[#ccc]">
                <TextData keyName="name" index={index} id={data._id.$oid} games={games} setGames={setGames} />
            </td>
            <td className="border border-[#ccc]">
                <TextData keyName="price" index={index} id={data._id.$oid} games={games} setGames={setGames} />
            </td>
            <td className="border border-[#ccc]">
                <div className='w-[100%] flex justify-center items-center'>
                    <ImageHandler keyName="image" index={index} id={data._id.$oid} games={games} setGames={setGames} />
                </div>
            </td>
            <td className="border border-[#ccc] p-2"><ListPrint list={data.catagory}/></td>
            <td className="border border-[#ccc] p-2"><ListPrint list={data.key_features}/></td>
            <td className="border border-[#ccc]">
                <TextData keyName="brand_name" index={index} id={data._id.$oid} games={games} setGames={setGames} />
            </td>
            <td className="border border-[#ccc]">
                <TextData keyName="description" index={index} id={data._id.$oid} games={games} setGames={setGames} />
            </td>
        </tr>
    );
};

export default TableRow;