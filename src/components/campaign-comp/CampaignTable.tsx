import { UserCampaignAtom } from "atoms/UserAtom";
import ShareIcon from "components/ShareIcon";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import {
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from "react-share";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ICampaign } from "types/Applicant.types";
import { BASEURL } from "utils/constants";

const CampaignTable = (): JSX.Element => {
	const campaigns = useRecoilValue<ICampaign[]>(UserCampaignAtom);
	return (
		<div>
			<div className="container">
				<Table className="table table-striped">
					<thead className="thead bg-secondary text-white">
						<tr className="table-row">
							<th>All Campaigns</th>
							<th>Date Created</th>
							<th> Status </th>
							<th> Promotion amount  </th>
							<th> Promotion target  </th>
							<th> Views </th>
							<th> Endorsements </th>
							<th> Action </th>

							<th></th>
						</tr>
					</thead>
					<tbody className="tbody">
						{campaigns?.map((camp, i) => (
							<SingleRow key={i} camp={camp} />
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default CampaignTable;

const Table = styled.table`
	.tbody {
		.table-row {
			a {
				img {
					width: 3rem;
					object-fit: cover;
					margin-right: 1rem;
				}
			}
		}
	}
`;

const SingleRow = ({ camp }: { camp: ICampaign }) => {
	return (
		<tr className="table-row">
			<td>
				<Link href={`/campaigns/${camp?.slug}`}>
					<a className="text-decoration-none link-dark">
						<img src={camp?.image} alt="" />
						{camp?.title}
					</a>
				</Link>
			</td>
			<td>{dayjs(camp?.createdAt).format("DD/MM/YYYY")}</td>

			<td>
				<i
					className={`fas me-2 ${
						camp?.status === "Pending"
							? "text-warning fa-dot-circle"
							: "text-success fa-check-circle"
					}`}
				></i>
				{/* {camp.status} */}
			</td>
			<td> 0 </td>
			<td> 0 </td>
			<td> {camp?.views?.length} </td>
			<td> {Number(camp?.endorsements?.length) + 1} </td>

			<td>
				<Link href={`/promote?slug=${camp?.slug}`}>
					<a className="btn p-0">{camp?.promoted ? "Upgrade" : "Promote"}</a>
				</Link>
			</td>
			<td>
				<Link href={`/promote?slug=${camp?.slug}`}>
					<a className="btn p-0">Edit</a>
				</Link>
			</td>

			<td>
				<CampaignShareMenuList camp={camp}>
					<span className="btn p-0">
						<ShareIcon />
					</span>
				</CampaignShareMenuList>
			</td>
		</tr>
	);
};

export const CampaignShareMenuList = ({
	camp,
	children,
	...props
}: {
	camp: ICampaign;
	children: React.ReactChild;
}): JSX.Element => {
	return (
		<div className="dropdown">
			<span data-bs-toggle="dropdown" {...props}>
				{children}
			</span>
			<ul className="dropdown-menu m-0 ">
				<li className="dropdown-menu-item mb-2 ">
					<FacebookShareButton url={`${BASEURL}/campaigns/${camp?.slug}`}>
						<button className="btn py-0 ">
							<i className="fab fa-facebook-f text-facebook me-2"></i>
							Facebook
						</button>
					</FacebookShareButton>
				</li>
				<li className="dropdown-menu-item mb-2 ">
					<TwitterShareButton url={`${BASEURL}/campaigns/${camp?.slug}`}>
						<button className="btn py-0 ">
							<i className="fab fa-twitter text-twitter me-2"></i> Twitter
						</button>
					</TwitterShareButton>
				</li>
				<li className="dropdown-menu-item mb-2 ">
					<WhatsappShareButton url={`${BASEURL}/campaigns/${camp?.slug}`}>
						<button className="btn py-0 ">
							<i className="fab fa-whatsapp text-whatsapp me-2 "></i>
							Whatsapp
						</button>
					</WhatsappShareButton>
				</li>
			</ul>
		</div>
	);
};
