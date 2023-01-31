import { gql, useMutation } from "@apollo/client";
import { StarIcon } from "@heroicons/react/24/outline";
import StarFill from "../public/star-fill.svg"
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import MenuContext from "../contexts/click";
import useAuth, { User } from "../hooks/useAuth";
import Image from "next/image";

const ADD_FAV = gql`
  mutation UpdatePost($id: ID!, $name: String!) {
    updateAvtal(input: {
      clientMutationId: "UpdatePost", 
      id: $id, 
      tags: {nodes: {name: $name}, append: true}}
    ) {
      avtal {
        tags {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
`;

const REMOVE_FAV = gql`
  mutation UpdatePost($id: ID!) {
    updateAvtal(input: {
      clientMutationId: "UpdatePost", 
      id: $id, 
      tags: {append: false}
    }) {
      avtal {
        tags {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
`;

export default function StarButton({ item, id }) {
  const [favoriteAdd] = useMutation(ADD_FAV);
  const [favoriteRemove] = useMutation(REMOVE_FAV);
  //const [favorite, setFavorite] = useContext(MenuContext);
  const [favorite, setFavorite] = useState<boolean>(false);

  const { user } = useAuth();
  const { email } = user as User;

  useEffect(() => {
    const data = window.localStorage.getItem('SAVE_FAVORITE');
    if (data !== null) setFavorite(JSON.parse(data))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('SAVE_FAVORITE', JSON.stringify(favorite))
  }, [favorite])  

  const addAvtal = () => {
    if (favorite === false) {
      toast.success("Avtalet är sparat");
      setFavorite(true)
      favoriteAdd({
        variables: {
          id: id,
          name: email,
        }
      })
    } if (favorite === true) {
      toast.success("Avtalet har tagits bort");
      setFavorite(false);
      favoriteRemove({
        variables: {
          id: id,
          name: email,
        }
      })
    }
  };

  return (
    <button 
      onClick={addAvtal}
      className={`absolute top-6 right-6 h-6 w-6 cursor-pointer text-yellow-500 ${favorite ? 'active' : ''}`}
    >
      {favorite === true ? (
        <Image
          height="24"
          width="24"
          alt="star"
          className="text-yellow-500"
          src={StarFill}
        />
      ) : ( 
        <StarIcon className="h-6 w-6 text-[#FFAB57]"/>
      )}
    </button> 
  )
}