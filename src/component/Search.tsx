import { styled} from "@mui/material";
import InputBase from '@mui/material/InputBase';
import Typography from "@mui/material/Typography";
import {SearchInterface} from "../interface/Search.tsx";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    backgroundColor: theme.palette.background.paper,
    width: '60%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function Search({ onChanged }: SearchInterface) {
    return (
        <>
            <div style={{position: 'relative', width: '100%', backgroundColor: '#1976d2', height: '20em', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column", marginBottom: 10}}>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                    iBlog
                </Typography>
                <StyledInputBase
                    placeholder="Search a article"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => onChanged(e.target.value)}
                />
            </div>
        </>
    )
}

export default Search;
