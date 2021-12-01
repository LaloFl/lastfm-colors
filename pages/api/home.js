export default function home(req, res) {
    res.status(200).json({
        vars: process.env,
    });
}