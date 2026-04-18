export default async function UserProfilePage({ params }: any) {

    const { id } = await params;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">
                Profile page {id}
            </p>
        </div>
    );
}