import React from 'react';

interface ListPrintProps {
    list: string;
}

const ListPrint: React.FC<ListPrintProps> = ({ list }) => {
    return (
        <div>
            {list.map((item, index) => (
                <span key={index}>
                    {item}
                    {index < list.length - 1 && ', '}
                </span>
            ))}
        </div>
    );
};

export default ListPrint;