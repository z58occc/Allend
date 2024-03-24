import React from 'react'
import { Link } from 'react-router-dom'

function Category() {
    return (

        <div>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n  .fakeimg {\n    height: 100px;\n    background: #aaa;\n  }\n  "
                }}
            />
            <div className="container mt-5">
                <div className="row justify-content-center">

                    <div className="col-sm-2 ">
                        <Link to='/findman' >
                            <div className="fakeimg">Fake Image</div>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/findman' >
                            <div className="fakeimg">Fake Image</div>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/findman' >
                            <div className="fakeimg">Fake Image</div>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/findman' >
                            <div className="fakeimg">Fake Image</div>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/findman' >
                            <div className="fakeimg">Fake Image</div>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    

                </div>
            </div>
        </div>
    )
}

export default Category