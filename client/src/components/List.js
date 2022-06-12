import { useNavigate } from "react-router-dom";

const List = ({ files }) => {
	let navigate = useNavigate();

	const viewFile = (event) => {
		navigate(`/view/${event.currentTarget.dataset.name}`);
	};

	const itemName = (name) => {
		return name.split(".").slice(0, -1).join(".");
	};

	return (
		<div className="list_container">
			{files.map((item) => (
				<div key={item.Key} className="list_item">
					<div
						className="item_container"
						data-name={item.Key}
						onClick={viewFile}
					>
						{itemName(item.Key)}
					</div>
				</div>
			))}
		</div>
	);
};

export default List;
