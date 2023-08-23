const CategoryButton = ({
    displayName,
    setSelectedCategory,
    selectedCategory,
}) => {
    const styles = () => {
        const selectedStyles = "bg-primary text-default";
        const notSelectedStyles = "bg-tinted-base hover:bg-tinted-highlight";
        if (selectedCategory === displayName) {
            return selectedStyles;
        }
        return notSelectedStyles;
    };
    return (
        <button
            className={`rounded-2xl py-2 px-4 ${styles()}`}
            onClick={() => setSelectedCategory(displayName)}
        >
            {displayName}
        </button>
    );
};
export default CategoryButton;
