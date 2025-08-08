import { Gear, FiletypeMd, Calculator, File } from "react-bootstrap-icons";

const BootstrapIcon = ({ icon, size }) => {
  switch (icon) {
    case "gear":
      return <Gear size={size} />;
    case "filetypeMd":
      return <FiletypeMd size={size} />;
    case "calculator":
      return <Calculator size={size} />;
    default:
      return <File size={size} />;
  }
};

export default BootstrapIcon;
