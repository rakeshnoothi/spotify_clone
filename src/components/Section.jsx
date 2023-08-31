import Card from "./Card";

const Section = ({ data, isLoading }) => {
    const returnSectionCards = () => {
        if (data !== null) {
            const playlistsData = data.playlists.items.map(data => {
                const formattedData = {
                    image: data.images[0].url,
                    id: data.id,
                    description: data.description,
                    href: data.href,
                    name: data.name,
                    ownerName: data.owner.display_name,
                    type: data.type,
                    uri: data.uri,
                    tracksHref: data.tracks.href,
                    totalTracks: data.tracks.total,
                };
                return formattedData;
            });

            return playlistsData.map(item => (
                <Card data={item} key={item.id} />
            ));
        }
        return <div>nothing to show here</div>;
    };

    if (isLoading) return <div>Loading.....</div>;
    return (
        <div className="flex flex-col space-y-4 w-full">
            <h1 className="text-2xl font-bold">Feautred</h1>
            <div className="flex flex-wrap w-full gap-3 justify-center">
                {returnSectionCards()}
            </div>
        </div>
    );
};
export default Section;

//
