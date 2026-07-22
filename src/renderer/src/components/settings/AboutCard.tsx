import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function AboutCard() {

    return (

        <Card>

            <CardHeader>

                <CardTitle>
                    About
                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-2">

                <p>Everyday Brew POS</p>

                <p>Version 1.0.0</p>

                <p>Desktop Edition</p>

            </CardContent>

        </Card>

    );
}

export default AboutCard;