import React from "react";
import { useState } from "react";


const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    //計算看看有幾頁
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <button
                onClick={() =>
                    setCurrentPage((prev) => {
                        if (prev === 1) return prev;
                        return prev - 1;
                    })
                }
            >
                {"<"}
            </button>
            {pages.map((page, index) => {
                return (
                    <button
                        className={currentPage === page ? "active" : ""}
                        key={index}
                        onClick={() => {
                            setCurrentPage(page);
                        }}
                    >
                        {page}
                    </button>
                );
            })}
            <button
                onClick={() =>
                    setCurrentPage((prev) => {
                        if (prev === pages.length) return prev;
                        return prev + 1;
                    })
                }
            >
                {">"}
            </button>
        </div>
    );
};

export default Pagination;