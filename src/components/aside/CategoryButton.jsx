const CategoryButton = ({ displayName, handleClick, selectedCategory }) => {
    const buttonClass = `rounded-2xl py-2 px-4 ${
        selectedCategory === displayName
            ? "bg-primary text-default"
            : "bg-tinted-base hover:bg-tinted-highlight"
    }`;

    return (
        <button
            className={buttonClass}
            onClick={() => handleClick(displayName)}
        >
            {displayName}
        </button>
    );
};
export default CategoryButton;
