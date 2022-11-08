import uploadImage from "@/modules/daybook/helpers/uploadImage";
import axios from "axios";
import "setimmediate";
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: "lavaca",
    api_key: "488267212225138",
    api_secret: "tQmTcz_h8ZnnIl32Xhkh8G3YPGQ",
});

describe("Pruebas en el uploadimage", () => {
    test("debe de cargar un archivo y retornar el url", async () => {
        const { data } = await axios.get(
            "https://res.cloudinary.com/lavaca/image/upload/v1580762357/elfqsfsx8xnwmktypmvp.gif",
            {
                responseType: "arraybuffer",
            }
        );
        const file = new File([data], "foto.gif");
        const { url, id } = await uploadImage(file);
        expect(typeof url).toBe("string");
        //console.log({ url, extension, id });
        const { deleted } = await cloudinary.v2.api.delete_resources(id);
        expect(deleted[id]).toBe("deleted");
    });
});
