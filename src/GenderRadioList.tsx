import {
    Radio,
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";


interface RadioGenderHorizontalListProps {
    selectedGender: string | null;
    onGenderChange: (value: string) => void;
}

const RadioGenderHorizontalList:React.FC<RadioGenderHorizontalListProps> = ({ selectedGender, onGenderChange }) => {

    return (
        <Card className="w-full max-w-sm mb-4">
            <h3>Select Your Gender</h3>
            <List className="flex-row">
                <ListItem className="p-0">
                    <label
                        htmlFor="horizontal-list-react"
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                        <ListItemPrefix className="mr-3">
                            <Radio
                                name="horizontal-list"
                                id="horizontal-list-react"
                                ripple={false}
                                color="blue"
                                className="hover:before:opacity-0  checked:ring-2 checked:ring-blue-500"
                                containerProps={{
                                    className: "p-0",
                                }} crossOrigin={undefined}
                                onChange={() => onGenderChange('M')}
                                checked={selectedGender === 'M'}
                            />
                        </ListItemPrefix>
                        <Typography
                            color="blue-gray"
                            className="text-sm text-blue-gray-400"
                        >
                            Male
                        </Typography>
                    </label>
                </ListItem>
                <ListItem className="p-0">
                    <label
                        htmlFor="horizontal-list-vue"
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                        <ListItemPrefix className="mr-3">
                            <Radio
                                name="horizontal-list"
                                id="horizontal-list-vue"
                                ripple={false}
                                color="blue"
                                className="hover:before:opacity-0 checked:ring-2 checked:ring-blue-500"
                                containerProps={{
                                    className: "p-0",
                                }} crossOrigin={undefined}
                                onChange={() => onGenderChange('F')}
                                checked={selectedGender === 'F'}
                            />
                        </ListItemPrefix>
                        <Typography
                            color="blue-gray"
                            className="text-sm text-blue-gray-400"
                        >
                            Female
                        </Typography>
                    </label>
                </ListItem>

            </List>
        </Card>
    );
}
export default RadioGenderHorizontalList;