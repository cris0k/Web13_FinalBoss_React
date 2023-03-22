import i18n from "../../i18n";

const EmptyList = () => {
    return (
      <div>
        <p>{i18n.t("No products")}</p>
      </div>
    );
  };

  export default EmptyList