import React from "react";
import { useState } from "react";
import "./Pagination.css"

const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    //計算看看有幾頁
    let pages = [];
    const [changecolor, setChangecolor] = useState(false);
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="pagination" >
            <button
                onClick={() =>
                    setCurrentPage((prev) => {
                        if (prev === 1) return prev;
                        return prev - 1;
                    })
                }
                style={{borderRadius: "5px"}}
            >
                上一頁
            </button>
            {pages.map((page, index) => {
                return (
                    <button
                        style={{ margin: "3px" ,borderRadius: "5px"}}
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
                style={{borderRadius: "5px"}}
            >
                下一頁
            </button>
        </div >
    );
};

export default Pagination;