import useFetch from "../../hooks/useFetch";
import fetchFunctions from "../../utils/api";
import Section from "../../components/Section";

const Home = () => {
    const { data, isLoading } = useFetch([
        fetchFunctions.getCurrentUserFeatured,
    ]);
    const [feauteredData] = data;
    return (
        <div className="rounded-lg flex flex-col space-y-8">
            <Section data={feauteredData} isLoading={isLoading} />
        </div>
    );
};
export default Home;
