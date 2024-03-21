import React from 'react'

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
                <div className="row">

                    <div className="col-sm-2 ">

                        <div className="fakeimg">Fake Image</div>


                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">

                        <div className="fakeimg">Fake Image</div>


                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">

                        <div className="fakeimg">Fake Image</div>


                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">

                        <div className="fakeimg">Fake Image</div>


                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">

                        <div className="fakeimg">Fake Image</div>


                        <hr className="d-sm-none" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Category