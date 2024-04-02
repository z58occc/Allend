import React from 'react'
import { Modal ,Button ,Table} from 'react-bootstrap';
function GetQuoteModal( {show, onHide, index }) {
    console.log(index)
  return (
    <Modal show={show} onHide= {onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            案件名稱 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover>
            <thead>
              <tr>
                <th>案件名稱</th>
                <th>接案人姓名</th>
                <th>Email</th>
                <th>族群</th>
                <th>報價金額</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>項目名稱</td>
                <td>NTD$ 1000</td>
                <td>NTD$ 1000</td>
                <td>NTD$ 1000</td>
                <td>
                  <div class="d-flex justify-content-start">
                    <Button
                      variant="secondary"
                      style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                    >
                      接受
                    </Button>
                    <Button
                      variant="danger"
                      style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                    >
                      拒絕
                    </Button>
                    <Button
                      variant="secondary"
                      style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                    >
                      聊聊
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default GetQuoteModal
