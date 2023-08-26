import Card from "../pages/Card";

const Section = () => {
    return (
        <div className="flex flex-col space-y-4 overflow-scroll w-full">
            <h1 className="text-2xl font-bold">Recently Played</h1>
            <div className="flex space-x-4">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};
export default Section;
