import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState("");
  const [answer, setAnswer] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSave = () => {
    if (!image || !desc || !answer) {
      alert("이미지와 텍스트를 모두 입력해주세요!");
      return;
    }

    const jsonData = {
      imageFileName: image.name,
      description: desc,
      answer: answer,
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json";
    link.click();
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="container bg-white shadow p-5 rounded-4">
        <div className="row g-4 align-items-center">
          {/* 왼쪽: 이미지 업로드 */}
          <div className="col-md-6 text-center">
            <h4 className="mb-3 fw-bold text-secondary">이미지 업로드</h4>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control mb-3"
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            )}
          </div>

          {/* 오른쪽: 입력 영역 */}
          <div className="col-md-6">
            <h4 className="mb-3 fw-bold text-secondary">입력 내용</h4>
            <div className="mb-3">
              <label className="form-label">이미지 설명</label>
              <input
                type="text"
                className="form-control"
                placeholder="예: 고양이가 앉아있는 모습"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">답변</label>
              <input
                type="text"
                className="form-control"
                placeholder="예: 이건 스코티시폴드입니다"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary w-100 py-2 fw-semibold"
              onClick={handleSave}
            >
              💾 JSON 파일로 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
