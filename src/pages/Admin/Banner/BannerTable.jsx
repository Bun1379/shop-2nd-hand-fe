import { Button, Table } from "react-bootstrap";

const BannerTable = ({ banners, handleUpdateBanner, handleDeleteBanner }) => {
  return (
    <Table striped bordered hover className="mt-2">
      <thead>
        <tr>
          <th>Id</th>
          <th>Tiêu đề</th>
          <th>Image</th>
          <th>Vị trí</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {banners.map((banner) => (
          <tr key={banner._id}>
            <td>{banner._id}</td>
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
            <td>
              <Button onClick={() => handleUpdateBanner(banner)}>Edit</Button>
              <Button
                className="ms-2"
                variant="danger"
                onClick={() => handleDeleteBanner(banner._id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BannerTable;
