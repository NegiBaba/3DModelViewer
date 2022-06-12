const List = () => {
	const list = [
		{
			id: 1,
			name: "file",
		},
		{
			id: 2,
			name: "file2",
		},
		{
			id: 3,
			name: "file3",
		},
		{
			id: 4,
			name: "file4",
		},
		{
			id: 5,
			name: "file5",
		},
		{
			id: 6,
			name: "file6",
		},
	];

	return (
		<div className="list_container">
			{list.map((item) => (
				<div key={item.id} className="list_item">
					{item.name}
				</div>
			))}
		</div>
	);
};

export default List;
