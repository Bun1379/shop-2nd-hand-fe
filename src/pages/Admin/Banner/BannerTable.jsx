import { Button, Table } from "react-bootstrap";

const BannerTable = ({ banners, handleUpdateBanner, handleDeleteBanner }) => {
  return (
    <Table striped bordered hover className="mt-2">
      <thead>
        <tr>
          <th>Tiêu đề</th>
          <th>Image</th>
          <th>Vị trí</th>
          <th>Trạng thái</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {banners.map((banner) => (
          <tr key={banner._id}>
            <td>{banner.title}</td>
            <td>
              <img
                src={banner.image}
                alt={banner.title}
                style={{
                  height: "50px",
                }}
              />
            </td>
            <td>{banner.position}</td>
            <td>{banner.status ? "Đang hoạt động" : "Đã tắt"}</td>
            <td>
              <Button onClick={() => handleUpdateBanner(banner)}>Sửa</Button>
              <Button
                className="ms-2"
                variant="danger"
                onClick={() => handleDeleteBanner(banner._id)}
              >
                Xóa
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BannerTable;
