import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
//發案人資料
export function PerpetratorForm() {
    const [formData, setFormData] = useState({
        identity: '',
        nickname: '',
        experience: '',
        location: '',
        idCard: '',
        email: '',
        name: '',
        phone: '',
        gender: 'male',
        area: '',
        selectedDate: null
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log("Form submitted:", formData);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <>
<Container>
<h2 className="text-center">接案人填寫資料</h2>

{isSubmitted ? (
    <div className="text-center mt-3">提交完成</div>
) : (


    <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
            <Form.Label column sm={12}>接案人身分：</Form.Label>
            <Col sm={6}>
                <Form.Check
                    type="radio"
                    name="identity"
                    id="freelancer"
                    label="個人"
                    value="freelancer"
                    checked={formData.identity === "freelancer"}
                    onChange={handleChange}
                />
            </Col>
            <Col sm={6}>
                <Form.Check
                    type="radio"
                    name="identity"
                    id="company"
                    label="公司"
                    value="company"
                    checked={formData.identity === "company"}
                    onChange={handleChange}
                />
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Label column sm={6}>累積年資：</Form.Label>
            <Form.Label column sm={6}>接案地點：</Form.Label>

        </Form.Group>
        <Form.Group>

            <div className="row">
                <div className="col-sm-6">
                    <Form.Select name="experience" value={formData.experience} onChange={handleChange}>
                        <option value="">請選擇累積年資</option>
                        <option value="1">1~5 年</option>
                        <option value="2">6~10 年</option>
                        <option value="3">10~15 年</option>
                        <option value="3">15 年以上</option>

                        {/* 添加更多選項，或從數據源中動態生成 */}
                    </Form.Select>
                </div>
                <div className="col-sm-6">
                    <Form.Select name="location" value={formData.location} onChange={handleChange}>
                        <option value="">請選擇地點</option>
                        <optgroup label="北部">
                            <option value="台北市">台北市</option>
                            <option value="新北市">新北市</option>
                            <option value="桃園市">桃園市</option>
                            <option value="基隆市">基隆市</option>
                            <option value="新竹市">新竹市</option>
                            <option value="新竹縣">新竹縣</option>
                        </optgroup>
                        <optgroup label="中部">
                            <option value="台中市">台中市</option>
                            <option value="彰化縣">彰化縣</option>
                            <option value="南投縣">南投縣</option>
                            <option value="苗栗縣">苗栗縣</option>
                        </optgroup>
                        <optgroup label="南部">
                            <option value="台南市">台南市</option>
                            <option value="高雄市">高雄市</option>
                            <option value="屏東縣">屏東縣</option>
                            <option value="嘉義市">嘉義市</option>
                            <option value="嘉義縣">嘉義縣</option>
                        </optgroup>
                        <optgroup label="東部">
                            <option value="宜蘭縣">宜蘭縣</option>
                            <option value="花蓮縣">花蓮縣</option>
                            <option value="台東縣">台東縣</option>
                        </optgroup>
                        <optgroup label="離島">
                            <option value="澎湖縣">澎湖縣</option>
                            <option value="金門縣">金門縣</option>
                            <option value="連江縣">連江縣</option>
                        </optgroup>
                        {/* 在這裡添加更多的地點選項 */}
                    </Form.Select>
                </div>
            </div>

        </Form.Group>
        <br />
        <div>
            <hr />
        </div>


        <Form.Group as={Row}>
            <Form.Label column sm={6}>身份證：</Form.Label>
            <Form.Label column sm={6}>選擇出生日期：</Form.Label>

        </Form.Group>

        <Form.Group as={Row}>
            <Col sm={6}>
                <Form.Control type="text" name="idCard" value={formData.idCard} onChange={handleChange} />
            </Col>
            <Col sm={6}>
                <DatePicker
                    selected={formData.selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                />
            </Col>
        </Form.Group>
        <br />

        <Form.Group as={Row}>
            <Form.Label column sm={6}>電子郵件：</Form.Label>
            <Form.Label column sm={6}>真實姓名/公司名稱：</Form.Label>

        </Form.Group>

        <Form.Group as={Row}>
            <Col sm={6}>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Col>

            <Col sm={6}>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Col>
        </Form.Group>
        <br />
        <Form.Group as={Row}>
            <Form.Label column sm={2}>電話：</Form.Label>
            <Col sm={4}>
                <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </Col>

            <Form.Label column sm={2}>性別：</Form.Label>
            <Col sm={4}>
                <Form.Check
                    inline
                    type="radio"
                    label="男性"
                    name="gender"
                    id="male"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                />
                <Form.Check
                    inline
                    type="radio"
                    label="女性"
                    name="gender"
                    id="female"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                />
            </Col>
        </Form.Group>

        <br />
        <Form.Group as={Row}>
            <Form.Label column sm={3}>所在地區：</Form.Label>
            <Col sm={9}>
                <Form.Select name="area" value={formData.area} onChange={handleChange}>
                    <option value="">請選擇所在地區</option>
                    <optgroup label="北部">
                        <option value="台北市">台北市</option>
                        <option value="新北市">新北市</option>
                        <option value="桃園市">桃園市</option>
                        <option value="基隆市">基隆市</option>
                        <option value="新竹市">新竹市</option>
                        <option value="新竹縣">新竹縣</option>
                    </optgroup>
                    <optgroup label="中部">
                        <option value="台中市">台中市</option>
                        <option value="彰化縣">彰化縣</option>
                        <option value="南投縣">南投縣</option>
                        <option value="苗栗縣">苗栗縣</option>
                    </optgroup>
                    <optgroup label="南部">
                        <option value="台南市">台南市</option>
                        <option value="高雄市">高雄市</option>
                        <option value="屏東縣">屏東縣</option>
                        <option value="嘉義市">嘉義市</option>
                        <option value="嘉義縣">嘉義縣</option>
                    </optgroup>
                    <optgroup label="東部">
                        <option value="宜蘭縣">宜蘭縣</option>
                        <option value="花蓮縣">花蓮縣</option>
                        <option value="台東縣">台東縣</option>
                    </optgroup>
                    <optgroup label="離島">
                        <option value="澎湖縣">澎湖縣</option>
                        <option value="金門縣">金門縣</option>
                        <option value="連江縣">連江縣</option>
                    </optgroup>
                    {/* 添加更多的地區選項 */}
                </Form.Select>
            </Col>
        </Form.Group>
        <br />

        <Button type="submit" variant="danger" style={{ width: '50%', margin: '0 auto', display: 'block' }} disabled={!isFormComplete}>提交</Button>
        <Button variant="secondary" onClick={handleReset}>重置</Button>
    </Form>
)}
</Container>   
</>
);
}

export default PerpetratorForm;
