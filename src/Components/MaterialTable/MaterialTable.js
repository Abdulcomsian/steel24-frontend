import { Resizable } from "react-resizable";
import { Table } from "antd";
import { useState } from "react";

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }
  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
      }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

function MaterialTable(props) {
  const [columns, setColumns] = useState([
    {
      title: "Product",
      dataIndex: "Product",
      width: 250,
      sorter: (a, b) => a.Product.localeCompare(b.Product),
    },
    {
      title: "Thickness",
      dataIndex: "Thickness",
      width: 250,
      sorter: (a, b) => a.Thickness - b.Thickness,
    },
    {
      title: "Weight",
      dataIndex: "Weight",
      width: 250,
      sorter: (a, b) => a.Weight - b.Weight,
    },
    {
      title: "Width",
      dataIndex: "Width",
      width: 250,
      sorter: (a, b) => a.Width - b.Width,
    },
    {
      title: "Length",
      dataIndex: "Length",
      width: 250,
      sorter: (a, b) => a.Length - b.Length,
    },
    {
      title: "Grade",
      dataIndex: "Grade",
      width: 250,
    },
    {
      title: "Remark",
      dataIndex: "Remark",
      width: 250,
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: () => <a>Delete</a>,
    // },
  ]);

  const data = props?.list?.map((material) => {
    return {
      key: material?.id,
      Product: material?.Product,
      Thickness: material?.Thickness,
      Weight: material?.Weight,
      Width: material?.Width,
      Length: material?.Length,
      Grade: material?.Grade,
      Remark: material?.Remark,
    };
  });

  const handleResize =
    (index) =>
    (_, { size }) => {
      const newColumns = [...columns];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setColumns(newColumns);
    };
  const mergeColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <>
      <Table
        components={{
          header: {
            cell: ResizableTitle,
          },
        }}
        columns={mergeColumns}
        dataSource={data}
        pagination={false}
      />
    </>
  );
}

export default MaterialTable;
